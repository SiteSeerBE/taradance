import { LinkButton } from "@/components/buttons";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";

const Danser: React.FC = () => {
	return (
		<>
			<header className="container">
				<hgroup>
					<h1>Danser</h1>
					<Breadcrumbs>
						<Breadcrumb href="/">Taradance</Breadcrumb>
						<Breadcrumb href="/dashboard">Dashboard</Breadcrumb>
						<Breadcrumb>Danser</Breadcrumb>
					</Breadcrumbs>
				</hgroup>
			</header>
			<aside className="container">
				<div className="row">
					<nav className="col-xs-12 col-md-12">
						<ul className="row">
							<li className="col-xs-12 col-md-4">
                                <a href="https://docs.google.com/spreadsheets/d/1lOSgYU2uFdPcX33Et3zgQUAd1qHNgs44DDJU1o_iQ6c/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer">
								<button className="w-full">
                                        Schoenenverkoop
                                      </button>
                                </a>
							</li>
                            <li className="col-xs-12 col-md-4">
                                <a href="https://drive.google.com/drive/folders/1kbjHts5xB0sdR1amOWIDHFnZ8tRFCB7U" target="_blank" rel="noopener noreferrer">
								<button className="w-full">
                                        Documenten
                                      </button>
                                </a>
							</li>
                            <li className="col-xs-12 col-md-4">
                                <a href="https://www.irishdanceshop.com/product-category/sportswear-for-school/schools-p-z/tara-dance-academy/" target="_blank" rel="noopener noreferrer">
								<button className="w-full">
                                        Taradance goodies
                                      </button>
                                </a>
							</li>
                            <li className="col-xs-12 col-md-4">
                                <a href="https://docs.google.com/spreadsheets/d/1Su3qgl9bGrujGrp0NyykBy0HFDQIaA4Fq-TzCEfDM_M/edit?gid=864103028#gid=864103028" target="_blank" rel="noopener noreferrer">
								<button className="w-full">
                                        Feis upgrades
                                      </button>
                                </a>
							</li>
                            <li className="col-xs-12 col-md-4">
                                <a href="https://sites.google.com/view/taradance-online/home" target="_blank" rel="noopener noreferrer">
								<button className="w-full">
                                        Oefenfilmpjes
                                      </button>
                                </a>
							</li>
                            <li className="col-xs-12 col-md-4">
                                <a href="/api/music" target="_blank" rel="noopener noreferrer">
								<button className="w-full">
                                        Music
                                      </button>
                                </a>
							</li>
						</ul>
					</nav>
				</div>
			</aside>
		</>
	);
};

export default Danser;
