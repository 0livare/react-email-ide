import { useState, useEffect } from 'react'
import styles from '~/styles/email.module.css'

export function CopyBtn(props: { html: string | undefined }) {
  const { html } = props
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!isCopied) return
    const timeoutId = setTimeout(() => setIsCopied(false), 3000)
    return () => clearTimeout(timeoutId)
  }, [isCopied])

  return (
    <button
      className={styles.copyBtn}
      onClick={async () => {
        if (!html) return
        await navigator.clipboard.writeText(html)
        setIsCopied(true)
      }}
    >
      {isCopied ? 'Copied to clipboard!' : 'Copy email HTML'}
    </button>
  )
}
