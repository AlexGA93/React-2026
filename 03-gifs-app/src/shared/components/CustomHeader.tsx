import type { FC } from "react";

interface Props {
  title: string;
  description?: string;
}

export const CustomHeader: FC<Props> = ({title, description}) => {
  return (
    <div className="content-center">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      </div>
  )
}
