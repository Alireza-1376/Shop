import OrderModal from "../../_components/DetailModal"

async function Detail({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
    const { id } = await searchParams;
    return (
        <OrderModal id={id}/>
    )
}

export default Detail