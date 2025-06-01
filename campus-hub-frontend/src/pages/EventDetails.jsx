import { useParams } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Event Details - {id}</h1>
      <p className="mt-4">Details about the selected event go here.</p>
    </div>
  );
}

export default EventDetails;
