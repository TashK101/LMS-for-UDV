const getFullNames = (people) => {
    return people.map(manager => `${manager.lastName} ${manager.firstName} ${manager.middleName}`);
};