export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        // Tu API KEY segura desde Vercel
        const apiKey = process.env.N8N_API_KEY;

        // URL del workflow de n8n
        const endpoint = "https://n8n.srv1123539.hstgr.cloud/webhook/contactoweb";

        // Forward a n8n
        const respuesta = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-N8N-API-KEY": apiKey
            },
            body: JSON.stringify(req.body)
        });

        const result = await respuesta.json();

        if (!respuesta.ok) {
            console.error("Error desde n8n:", result);
            throw new Error(`La API de n8n respondió con el estado: ${respuesta.status}`);
        }

        return res.status(200).json({ ok: true, result });

    } catch (error) {
        console.error("Error en la función de la API:", error);
        return res.status(500).json({
            ok: false,
            error: error.message
        });
    }
}