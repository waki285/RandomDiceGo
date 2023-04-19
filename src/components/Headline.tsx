export default function Headline({ children, renderAs = "h2", id, fontSize = 1.5, borderColor = "red", borderGradient }: { children: React.ReactNode, renderAs?: React.ElementType, id: string, fontSize?: number, borderColor?: string, borderGradient?: string }) {
  const Element = renderAs;
  return (
    <Element className={`border-l-8 pl-4 my-3`} id={id} style={{ borderLeftColor: borderColor, fontSize: `${fontSize}rem`, borderImage: borderGradient, borderImageSlice: 1 }}>{children}</Element>
  )
}