import { app } from "./app";


function Bootstrap() {
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
}

Bootstrap();