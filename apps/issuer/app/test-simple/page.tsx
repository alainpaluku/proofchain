'use client';

import { useState } from 'react';

export default function TestPage() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('✅ Form submitted!');
        setMessage('✅ Le formulaire fonctionne !');
        alert('Formulaire soumis avec succès !');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6">Test Simple</h1>
                
                {message && (
                    <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Nom:</label>
                        <input 
                            type="text" 
                            required
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Entrez votre nom"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        TESTER
                    </button>
                </form>

                <div className="mt-8 p-4 bg-gray-100 rounded">
                    <h2 className="font-bold mb-2">Instructions:</h2>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Remplir le champ nom</li>
                        <li>Cliquer "TESTER"</li>
                        <li>Vous devriez voir une alerte</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
