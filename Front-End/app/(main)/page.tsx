import { MyCarousel } from "./_components/Carousel"
import Footer from "./_components/Footer"
import Info from "./_components/Info"
import Menu from "./_components/Menu"
import Navbar from "./_components/Navbar"
import Tabs from "./_components/Tabs"


function Main() {
    return (
        <div className="px-4 md:px-0">
            <Navbar />
            <MyCarousel />
            <Tabs Menu={<Menu />} Info={<Info />} />
            <Footer />
        </div>
    )
}

export default Main