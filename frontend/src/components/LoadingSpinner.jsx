import { Spinner } from "@/components/ui/spinner"

function LoadingSpinner({label}) {
  return (
    <div className="flex h-dvh items-center justify-center gap-2 text-muted-foreground">
      <Spinner className="size-5" />
      {label && <span>{label}</span>}
    </div>
  )
}

export default LoadingSpinner
