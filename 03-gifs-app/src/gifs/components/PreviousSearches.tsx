import type { FC } from "react";

interface Props {
  searches: string[];
  onLabelClick: (term: string) => void;
}

export const PreviousSearches: FC<Props> = ({ searches, onLabelClick }) => {
  return (
    <div className="previous-searches">
      <h2>Busquedas Previas</h2>
      <ul className="previous-searches-list">
        { 
          searches.map(searchTerm => <li onClick={() => onLabelClick(searchTerm)} key={searchTerm}>{searchTerm}</li>)
        }
      </ul>
    </div>
  );
};
