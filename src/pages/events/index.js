import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'

const EventIndex = ({ data }) => {
  return (
    <div>
      {data.map((event) => (
        <a key={uuidv4()} href={`/events/${event.id}`}>
          <div>
            <Image src={event.image} alt={`${event.id} event`} width={200} height={200} />
            <h2>{event.title}</h2>
          </div>
        </a>
      ))}
    </div>
  )
}

export default EventIndex

export async function getServerSideProps() {
  const { events_categories } = await import('/data/data.json')
  return {
    props: {
      data: events_categories,
    }
  }
}
