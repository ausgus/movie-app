

import { Clapperboard } from "lucide-react";

const StateMessage = ({ title, description, children }) => (
  <div className="state-message">
    <Clapperboard size={36} strokeWidth={1.5} />
    <h3>{title}</h3>
    {description && <p>{description}</p>}
    {children}
  </div>
);


export default StateMessage;