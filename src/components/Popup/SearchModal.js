import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './SearchModal.css';

function SearchModal({ open, setPopup, message, callback }) {
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

export default SearchModal;
