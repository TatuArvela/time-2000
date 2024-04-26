import splash from './splash.png';

const Splash = () => (
  <div
    style={{
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <img src={splash} alt="Splash" />
  </div>
);

export default Splash;
