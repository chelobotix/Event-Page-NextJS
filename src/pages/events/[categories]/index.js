import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'
import Link from 'next/link';

const CategoriesIndex = ({ data }) => {
  return (
    <div>
      <h2>Events in {data[0].city.charAt(0).toUpperCase() + data[0].city.slice(1)}</h2>
      {data.map((event) => (
        <Link key={uuidv4()} href={`/events/${event.city}/${event.id}`} passHref>
          <div>
            <Image src={event.image} alt={`${event.id} event`} width={200} height={200} priority />
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export async function getStaticPaths() {
  const { events_categories } = await import('/data/data.json')
  const allPaths = events_categories.map((event) => (
    { params: { categories: event.id } }
  ))
  return {
    paths: allPaths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { allEvents } = await import('/data/data.json')
  const data = allEvents.filter((event) => event.city === context.params.categories)
  console.log(data)

  return {
    props: {
      data: data,
    }
  }
}

export default CategoriesIndex
