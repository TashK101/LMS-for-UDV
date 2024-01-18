export function addErrorToLink(link: string) {
    const linkParts = link.split("/");

    let addr = linkParts.slice(0, 3)

    addr.push("error");

    return addr.join("/");
}