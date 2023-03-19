function formatDate(date) {

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return date.toLocaleDateString('es-Es', options);

}

function formatHour(date) {
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }

    return date.toLocaleTimeString('es-Es', options);
}

export {
    formatDate,
    formatHour
}