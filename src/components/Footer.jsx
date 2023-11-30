
function Footer() {
  return (
    <div className='w-full pt-10 pb-10 sm:flex text-white'>
      <p className='m-auto'>Todos los derechos reservados</p>
      <p className='m-auto'>© Movies Review {new Date().getFullYear()}</p>
      <p className='m-auto'>Política de Privacidad</p>
    </div>
  )
}

export default Footer