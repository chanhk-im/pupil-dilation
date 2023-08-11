import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import './Popup.css';

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
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

const MyModal = styled.div`
    position: absolute;
    z-index: 999;
    top: 8rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 32px;
    background: white;
    box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.25);
    padding: 1.5rem;
    width: 496px;
    height: 243px;
    animation: modal-show 1s;
    color: var(--theme-navy, #2b3252);
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @keyframes modal-show {
        from {
            opacity: 0;
            margin-top: -50px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
`;

const Popup = ({ open, setPopup, message, callback }) => {
    const handleClose = () => {
        setPopup({ open: false });
        if (callback) {
            callback();
        }
    };

    return (
        <>
            {open && (
                <Background>
                    <MyModal className="myModal">
                        <div className="myModal-message">{message}</div>
                        <Button
                            className="popup-button"
                            variant="primary"
                            onClick={handleClose}
                        >
                            OK
                        </Button>
                    </MyModal>
                </Background>
            )}
        </>
    );
};

export default Popup;
