import CreateCategoryButton from "../categories/create-category-button"

interface PageTitleProps {
  title: string
  description?: string
}

export default function PageTitle({
  title,
  description,
}: PageTitleProps) {
  return (
    <div className="flex gap-4 justify-between w-full items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500">{description}</p>
      </div>

      <CreateCategoryButton />
    </div>
  )
}
