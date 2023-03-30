import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'
import Link from 'next/link';

const EventIndex = ({ data }) => {
  return (
    <div>
      {data.map((event) => (
        <Link key={uuidv4()} href={`/events/${event.id}`} passHref>
          <div>
            <Image src={event.image} alt={`${event.id} event`} width={200} height={200} priority />
            <h2>{event.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default EventIndex

export async function getStaticProps() {
  const { events_categories } = await import('/data/data.json')
  return {
    props: {
      data: events_categories,
    }
  }
}
