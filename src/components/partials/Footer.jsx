import React from 'react'

const Footer = () => {
    return (
        <footer className="flex-item nomarge flex-item">
            <div className="footer-item flex-item">LOGO BOX</div>
            <div className="footer-item flex-item">
                <a href="mailto:?subject=Mission-1.5%20:%20Contact%20particulier">Particuliers</a>
                <div className="hidden">||</div>
                <a href="mailto:?subject=Mission-1.5%20:%20Contact%20professionnel">Professionnels</a>
                <div className="hidden">||</div>
                <a href="mailto:?subject=Mission-1.5%20:%20J'ai%20repéré%20un%20bug">Signalez un bug</a>
            </div>
            <div className="footer-item flex-item">SOCIALS</div>
        </footer>
    )
}

export default Footer
