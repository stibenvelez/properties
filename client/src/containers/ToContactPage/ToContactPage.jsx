import ContactmeDetail from "components/ContactmeDetail/ContactmeDetail";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getToContactAction } from "store/slice/contact/contact.actions";

const ToContactPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        (() => {
            dispatch(getToContactAction(params.id));
        })();
    }, []);

    return (
        <div
            className={`nc-PageAbout overflow-hidden relative `}
            data-nc-id="PageAbout"
        >
            <Helmet>
                <title>Detalle de contacto</title>
            </Helmet>
            <div className="container py-4 space-y-4 lg:py-4 lg:space-y-8">
                <div className="py-4">
                    <div>
                        <h2 className="text-3xl font-semibold">
                            Detalle de contacto
                        </h2>
                        <p>Informacion detallada del prospecto</p>
                    </div>
                </div>
                <button
                    onClick={() => history.goBack()}
                    className="bg-gray-600 text-white py-1 px-4 rounded hover:bg-gray-500"
                >
                    Volver
                </button>
                <ContactmeDetail />
            </div>
        </div>
    );
};

export default ToContactPage;
