import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './DeletePopupAdmin.css';

function Popup({ open, setPopup, message, callback }) {
    const handleClose1 = () => {
        setPopup({ open: false });
    };

    const handleClose2 = () => {
        setPopup({ open: false });
        if (callback) {
            callback();
        }
    };
    return (
        <>
            <Modal
                className="myModal"
                show={open}
                onHide={(handleClose1, handleClose2)}
            >
                <Modal.Body className="myModal-message">{message}</Modal.Body>
                <Modal.Footer className="myModal-buttons">
                    <Button
                        className="popup-button1"
                        variant="primary"
                        onClick={handleClose1}
                    >
                        취소
                    </Button>
                    <Button
                        className="popup-button2"
                        variant="primary"
                        onClick={handleClose2}
                    >
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Popup;
