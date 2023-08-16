const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const firestore = admin.firestore();

exports.scheduleExpiredReservationCleanup = functions.pubsub
    .schedule('every 1 minutes')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        const reservationsRef = firestore.collection('ticketing');
        const reservationsSnapshot = await reservationsRef.get();

        const currentTime = admin.firestore.Timestamp.now();

        const batch = firestore.batch();

        reservationsSnapshot.forEach((reservationSnapshot) => {
            const expirationTime =
                reservationData.time.toMillis() + 15 * 60 * 1000;
            if (expirationTime <= currentTime) {
                batch.delete(reservationSnapshot.ref);
                console.log(
                    `Expired reservation deleted: ${reservationSnapshot.id}`,
                );
            }
        });

        return batch.commit();
    });
