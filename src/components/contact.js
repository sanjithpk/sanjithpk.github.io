import React, { useState } from "react"
import SendIcon from "./icons/send"
import LoaderIcon from "./icons/loader"

import { TextInput, Button } from "./ui"

const beforeContactFormSubmit = data => {
  // Code 0 - success
  // Code 1 - Name
  // Code 2 - Email
  // Code 3 - Message
  // Code 4 - Other
  const errors = []

  if (data.name.trim().length < 2) {
    errors.push({
      code: 1,
      message: "Enter a name"
    })
  }

  if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
    errors.push({
      code: 2,
      message: "Enter a valid email address"
    })
  }

  if (data.message.trim().length < 15) {
    errors.push({
      code: 3,
      message: "Enter a message with atleast 15 characters"
    })
  }

  if (errors.length > 0)
    return {
      result: false,
      errors: errors
    }

  return {
    data: {
      name: data.name,
      email: data.email,
      message: data.message
    },
    result: true
  }
}

const contactFormSubmit = async (api, data) => {
  let res = await fetch(api, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })

  res = await res.json()

  if (res.success) {
    return {
      result: true
    }
  }
  return {
    result: false,
    ...res
  }
}

const Form = ({ api }) => {
  const [data, changeData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [feedback, setFeedback] = useState({})

  const [transactionState, setTransactionState] = useState(false)

  const updateData = v => changeData({ ...data, ...v })

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        setTransactionState(true)

        const validate = beforeContactFormSubmit(data)

        if (validate.result) {
          setFeedback({})
          contactFormSubmit(api, validate.data)
            .then(res => {
              if (res.result) {
                setFeedback({
                  4: {
                    type: "success",
                    message: "Your message has been sent."
                  }
                })
              } else {
                setFeedback({
                  4: {
                    message:
                      "There was an error sending the message. Please try again."
                  }
                })
              }
              setTransactionState(false)
            })
            .catch(err => {
              setFeedback({
                4: {
                  message:
                    "There was an error sending the message. Please try again."
                }
              })
              setTransactionState(false)
            })
        } else {
          const errs = {}

          validate.errors.forEach(err => {
            errs[err.code] = { message: err.message }
          })

          setFeedback(errs)
          setTransactionState(false)
        }
      }}
    >
      <TextInput
        label="Name"
        name="name"
        onChange={e =>
          updateData({
            name: e.target.value
          })
        }
        footer={
          <FormMessage
            show={feedback[1] !== undefined}
            type="error"
            message={feedback[1]?.message}
          />
        }
      />
      <TextInput
        label="Email"
        name="email"
        type="email"
        onChange={e =>
          updateData({
            email: e.target.value
          })
        }
        footer={
          <FormMessage
            show={feedback[2] !== undefined}
            type="error"
            message={feedback[2]?.message}
          />
        }
      />
      <TextInput
        label="Message"
        name="message"
        type="textarea"
        onChange={e =>
          updateData({
            message: e.target.value
          })
        }
        footer={
          <FormMessage
            show={feedback[3] !== undefined}
            type="error"
            message={feedback[3]?.message}
          />
        }
      />
      <div className="py-3 lg:p-4">
        <FormMessage
          show={feedback[4] !== undefined}
          type={feedback[4]?.type || "error"}
          message={feedback[4]?.message}
        />

        <Button
          type="button,submit"
          title="Send"
          disabled={transactionState}
          iconRight={<IconRight spin={transactionState} />}
        />
      </div>
    </form>
  )
}

const IconRight = ({ spin = false }) => {
  if (spin) {
    return (
      <span
        className="spin"
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          animationDuration: "5s"
        }}
      >
        <LoaderIcon />
      </span>
    )
  }
  return <SendIcon />
}

const FormMessage = ({ show, type, message }) => {
  if (!show) return null
  return <p className={`text-${type} my-2`}>{message}</p>
}

export { Form }
