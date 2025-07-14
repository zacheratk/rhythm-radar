import './PreviewButton.css';

const PreviewButton = ({ preview }) => {
  return (
    <div className='center-contents'>
      <button 
      className="rounded glass-button"
      disabled={!preview /* If preview is not available, the button becomes disabled*/}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#f5f5f5"><path d="M320-203v-560l440 280-440 280Zm60-280Zm0 171 269-171-269-171v342Z"/></svg>
      </button>
    </div>
  )
}

export default PreviewButton;