export function createReservation(data, callback) {
    setTimeout(() => {
        const error =
            Math.random() > 0.5
                ? 'Database error: Failed to create reservation'
                : null;
        if (error) {
            callback(error, null);
        } else {
            callback(null, { id: Date.now(), ...data });
        }
    }, 1000);
}

export function getReservation(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const error =
                Math.random() > 0.5
                    ? 'Database error: Failed to retrieve reservation'
                    : null;
            if (error) {
                reject(error);
            } else {
                resolve({ id, name: 'Sample Reservation' });
            }
        }, 1000);
    });
}
