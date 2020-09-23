const links = [
    { href: 'https://github.com/joeisraelbrady/responsive-list-display', label: 'GitHub' },
]

export default function Nav() {
    return (
        <nav className="bg-blue-600 border-b-8 border-blue-700">
            <div className="flex justify-between items-baseline mx-5 md:mx-20 xl:w-256 xl:m-auto py-4 pt-3">
                <div className="text-2xl font-medium text-white">
                    <svg className="inline h-6 w-6 -mt-1 mr-2 fill-current text-purple-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 2h20v4H0V2zm0 8h20v2H0v-2zm0 6h20v2H0v-2z" /></svg>
                    Fetch List
                </div>
                <div className="flex justify-between items-center space-x-4">
                    {links.map(({ href, label }) => (
                        <div key={`${href}${label}`}>
                            <a href={href} className="btn-blue no-underline">{label}</a>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    )
}
