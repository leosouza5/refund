type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
}

export function Button({ children, isLoading, type = "button", ...rest }: Props) {
  return <button
    disabled={isLoading}
    className="flex items-center justify-center bg-green-100 rounded-lg text-white cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50 h-12"
    type={type}
    {...rest}
  >{children}</button>
}