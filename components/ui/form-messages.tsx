type FormMessageProps = {
  message: string
}

export function SuccessMessage({ message }: FormMessageProps) {
  return (
    <p className="text-center rounded-md p-2 bg-emerald-400/30 text-emerald-400">
      {message}
    </p>
  )
}


export function ErrorMessage({ message }: FormMessageProps) {
  return (
    <p className="text-center rounded-md p-2 bg-destructive/30 text-destructive-foreground">
      {message}
    </p>
  )
}
