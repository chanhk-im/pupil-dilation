import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import './Popup.css';

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    animation: modal-bg-show 1s;
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

function Popup({ open, setPopup, message, title, callback }) {
    const handleClose = () => {
        setPopup({ open: false });
        if (callback) {
            callback();
        }
    };

    return (
        <>
            <Modal className="myModal" show={open} onHide={handleClose}>
                <Modal.Body className="myModal-message">{message}</Modal.Body>
                <Modal.Footer>
                    <Button
                        className="popup-button"
                        variant="primary"
                        onClick={handleClose}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Popup;
