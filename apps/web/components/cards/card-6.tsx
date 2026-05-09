import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

const Placeholder = {
  title: <div className="h-8 w-full max-w-40 rounded-md bg-secondary" />,
  content: <div className="h-20 w-full rounded-md bg-secondary" />,
}
const Icon = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth="1"
      stroke="currentColor"
      className={cn("absolute size-6 text-foreground", className)}
    >
      <title>Icon</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  )
}

const Icons = () => (
  <>
    <Icon className="-top-3 -left-3" />
    <Icon className="-top-3 -right-3" />
    <Icon className="-bottom-3 -left-3" />
    <Icon className="-right-3 -bottom-3" />
  </>
)

export const Card_6 = () => {
  return (
    <Card className="relative rounded-none shadow-none">
      <Icons />
      <CardHeader>
        <CardTitle>{Placeholder.title}</CardTitle>
      </CardHeader>
      <CardContent>{Placeholder.content}</CardContent>
    </Card>
  )
}
