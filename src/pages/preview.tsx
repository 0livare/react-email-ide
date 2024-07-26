import { MjmlError as MjmlErrorType } from 'mjml-react'
import { useGetEmailHtml, CopyBtn } from '~/lib/preview-page'
import styles from '~/styles/email.module.css'

export default function DisplayEmailPreview() {
  const { rawHtml, html, errors, isError } = useGetEmailHtml()

  if (errors) {
    console.error(errors)
    console.error('The above errors were generated while converting the MJML to HTML')
    return <Errors errors={errors} />
  }

  if (isError) {
    return <GenericError error="Invalid email component name" />
  }

  return (
    <div className={styles.root}>
      <iframe srcDoc={html} className={styles.frame} />
      <CopyBtn html={rawHtml} />
    </div>
  )
}

function Errors(props: { errors: MjmlErrorType[] }) {
  const { errors } = props
  return (
    <div style={{ padding: 32, color: 'red', fontWeight: 'bold', fontSize: 36 }}>
      {errors.map((error, i) => (
        <p key={i}>
          {error.message ? <MjmlError error={error} /> : <GenericError error={error} />}
        </p>
      ))}
    </div>
  )
}

function MjmlError(props: { error: MjmlErrorType }) {
  const { error } = props
  return (
    <>
      <i style={{ fontSize: 24 }}>({error.tagName})</i>
      <br />
      {error.message}
    </>
  )
}

function GenericError(props: { error: any }) {
  return <>ERROR: {props.error}</>
}
