interface SectionDividerProps {
  title: string
  className?: string
}

export default function SectionDivider({ title, className }: SectionDividerProps) {
  return (
    <div className={`my-8 ${className}`}>
      <h2 className="text-2xl font-bold border-l-4 border-primary pl-3">{title}</h2>
    </div>
  )
}
