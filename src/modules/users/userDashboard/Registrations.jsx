import { useParams } from "react-router-dom";

const Registrations = () => {
  const { id } = useParams();
  
  return (
    <div>
      <main className="col p-4">
        <h2>Event ID: {id}</h2>
      </main>
    </div>
  )
}

export default Registrations
