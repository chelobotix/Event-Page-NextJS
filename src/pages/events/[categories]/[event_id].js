import Image from 'next/image'

const Event1 = ({ data }) => {
  const [dataFinal] = data
  return (
    <div>
      <h1>{dataFinal.title}</h1>
      <Image src={dataFinal.image} alt={`${data.id} event`} width={'1000'} height={'500'} priority />
      <p>{dataFinal.description}</p>
    </div>
  )
}

export async function getStaticPaths() {
  const { allEvents } = await import('/data/data.json')
  const allPaths = allEvents.map((event) => (
    {
      params: {
        categories: event.city,
        event_id: event.id
      }
    }
  ))
  return {
    paths: allPaths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { allEvents } = await import('/data/data.json')
  console.log(context)
  const data = allEvents.filter((event) => event.id === context.params.event_id)

  return {
    props: {
      data: data,
    }
  }
}

export default Event1
