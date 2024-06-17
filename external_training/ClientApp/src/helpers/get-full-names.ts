import {ApprovingManager, Participant} from "../types/application";

export function getFullNames (people : ApprovingManager[] | Participant[]) : string[] {
    return people ? people.map(manager => `${manager.lastName} ${manager.firstName} ${manager.middleName}`) : [];
};