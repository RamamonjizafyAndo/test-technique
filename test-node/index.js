function getAdults(users) {
    const currentDate = new Date();

    // Filtrer les utilisateurs qui ont au moins 18 ans
    return users.filter(user => {
        const birthDate = new Date(user.dob);

        // Calcul de l'âge en années
        let age = currentDate.getFullYear() - birthDate.getFullYear();

        // Vérifier si l'anniversaire de cette année est déjà passé
        // Si non, réduire l'âge de 1 an
        const hasBirthdayOccurred =
            currentDate.getMonth() > birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() &&
                currentDate.getDate() >= birthDate.getDate());

        if (!hasBirthdayOccurred) {
            age--;
        }

        // Retourner true si l'utilisateur a 18 ans ou plus
        return age >= 18;
    });
}

function main () {
    const users = [
        { name: "Alice", dob: "2025-02-29" },
        { name: "Bob", dob: "1990-12-31" },
        { name: "Charlie", dob: "2005-08-28" },
    ];
    
    const adults = getAdults(users);
    console.log("Voici les utilisateurs les utilisateurs ayant au moins 18 ans aujourd’hui.");
    console.log(adults);
}

main()