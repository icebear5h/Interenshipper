import * as genresAPI from "./fakeGenreService";

const internships = [
    {
        _id: "5b21ca3eeb7f6fbccd471815",
        title: "John Hopkins",
        genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Engineering" },
    },
    {
        _id: "5b21ca3eeb7f6fbccd471816",
        title: "NASA",
        genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Engineering" },
    },
    {
        _id: "5b21ca3eeb7f6fbccd471817",
        title: "NYU",
        genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Business" },
    },
    {
        _id: "5b21ca3eeb7f6fbccd471819",
        title: "National Institute of Health",
        genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Medical" },
    },
    {
        _id: "5b21ca3eeb7f6fbccd47181a",
        title: "Vistar Institute",
        genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Medical" },
    },
    {
        _id: "5b21ca3eeb7f6fbccd47181b",
        title: "Rockefelleer University",
        genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Medical" },
    },
    {
        _id: "5b21ca3eeb7f6fbccd47181e",
        title: "The Bella Abzug Leadership Institute",
        genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Business" },
    },
    {
        _id: "5b21ca3eeb7f6fbccd47181f",
        title: "DOROT Summer Teen Internship",
        genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Business" },
    },
    {
        _id: "5b21ca3eeb7f6fbccd471821",
        title: "Cosmos",
        genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Engineering" },
    }
];

export function getInternships() {
    //console.log(internships, "hello");
    return internships;
}

export function getInternship(id) {
    return internships.find(m => m._id === id);
}

export function saveInternship(internship) {
    let internshipInDb = internships.find(m => m._id === internship._id) || {};
    internshipInDb.name = internship.name;
    internshipInDb.genre = genresAPI.genres.find(g => g._id === internship.genreId);

    if (!internshipInDb._id) {
        internshipInDb._id = Date.now();
        internships.push(internshipInDb);
    }

    return internshipInDb;
}

export function deleteInternship(id) {
    let internshipInDb = internships.find(m => m._id === id);
    internships.splice(internships.indexOf(internshipInDb), 1);
    return internshipInDb;
}
