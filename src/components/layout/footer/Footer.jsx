import React from 'react';

const styles = {
    height: 'auto',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    padding: '1rem',
    color: '#fff',
    fontweight: 'bold',
    textAlign: 'center'
};

export function Footer() {
    return (
        <div className="footer bg-primary" style={styles}>
        <span> © 2020. All Rights Reserved. </span>
       </div>
    );
}