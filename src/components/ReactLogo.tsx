import logoReact from '../assets/react.svg';

export const ReactLogo = () => {
  return (
    <img 
      src={ logoReact } 
      alt="Logo React" 
      style={{
        bottom: '20px',
        position: 'fixed',
        right: '20px',
        width: '130px'
      }}
    />
  )
}