import FeaturesSection from './FeactureSection'
import HeroSection from './HeroSection'
import FooterSection from './FooterSection'
const LandingPage = () => {
  
  return (
    <div className='min-h-screen bg-[#0e0e10] text-white overflow-x-hidden'>
      {/**Navbar*/}
      <HeroSection />
      {/**Features*/}
      <FeaturesSection />
      {/**Fotter */}
      <FooterSection />
    </div>
  )
}

export default LandingPage