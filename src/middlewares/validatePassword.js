export const validatePassword = (req, res, next) => {
    const { password } = req.body;


    if (!password) {
        return res.status(400).json({ message: "La contraseña es obligatoria" });
    }


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "La contraseña debe tener al menos 8 caracteres, una mayúscula y una minúscula",
        });
    }

    next();
};
