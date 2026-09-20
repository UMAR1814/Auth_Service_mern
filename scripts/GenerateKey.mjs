import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certsDir = path.join(__dirname, '../certs');

if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir, { recursive: true });
}

crypto.generateKeyPair(
    'rsa',
    {
        modulusLength: 2048,

        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },

        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    },
    (err, publicKey, privateKey) => {
        if (err) {
            console.error('Error generating keys:', err);
            return;
        }

        // Save private key
        fs.writeFileSync(
            path.join(certsDir, 'private.pem'),
            privateKey
        );

        // Save public key
        fs.writeFileSync(
            path.join(certsDir, 'public.pem'),
            publicKey
        );

        console.log('Keys generated successfully!');
        console.log(`Private key: ${path.join(certsDir, 'private.pem')}`);
        console.log(`Public key: ${path.join(certsDir, 'public.pem')}`);
    }
);