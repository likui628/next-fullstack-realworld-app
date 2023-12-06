interface ListErrorsProps {
  errors?: string[]
}

const ListErrors = ({ errors }: ListErrorsProps) => {
  return (
    <ul className="error-messages">
      {errors?.map((error, i) => <li key={i}>{error}</li>)}
    </ul>
  )
}

export default ListErrors
