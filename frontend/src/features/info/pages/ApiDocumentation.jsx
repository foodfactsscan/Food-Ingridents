import { Code, Book, Zap, Database, Globe, Key, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ApiDocumentation = () => {
    const [copiedCode, setCopiedCode] = useState(null);

    const copyToClipboard = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const endpoints = [
        {
            method: 'GET',
            endpoint: '/api/product/:barcode',
            description: 'Retrieve product information by barcode',
            example: `// Example Request
fetch('https://world.openfoodfacts.org/api/v2/product/3017620422003.json')
  .then(response => response.json())
  .then(data => console.log(data));`,
            response: `{
  "status": 1,
  "product": {
    "product_name": "Nutella",
    "brands": "Ferrero",
    "nutriscore_grade": "e",
    "nutriments": {
      "energy-kcal_100g": 539,
      "fat_100g": 30.9,
      "carbohydrates_100g": 57.5,
      "proteins_100g": 6.3
    }
  }
}`
        },
        {
            method: 'GET',
            endpoint: '/api/search',
            description: 'Search products by name or keywords',
            example: `// Example Request
const query = 'chocolate';
fetch(\`https://world.openfoodfacts.org/cgi/search.pl?search_terms=\${query}&json=true\`)
  .then(response => response.json())
  .then(data => console.log(data));`,
            response: `{
  "count": 1000,
  "page": 1,
  "products": [
    {
      "product_name": "Dark Chocolate",
      "brands": "Lindt",
      "nutriscore_grade": "d"
    }
  ]
}`
        }
    ];

    const integrationGuide = [
        {
            title: 'JavaScript/React',
            icon: Code,
            code: `import axios from 'axios';

const scanProduct = async (barcode) => {
  try {
    const response = await axios.get(
      \`https://world.openfoodfacts.org/api/v2/product/\${barcode}.json\`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Usage
scanProduct('3017620422003')
  .then(data => console.log(data.product));`
        },
        {
            title: 'Python',
            icon: Code,
            code: `import requests

def scan_product(barcode):
    url = f"https://world.openfoodfacts.org/api/v2/product/{barcode}.json"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching product: {e}")
        return None

# Usage
product_data = scan_product('3017620422003')
if product_data and product_data.get('status') == 1:
    print(product_data['product'])`
        },
        {
            title: 'cURL',
            icon: Code,
            code: `# Get product by barcode
curl "https://world.openfoodfacts.org/api/v2/product/3017620422003.json"

# Search products
curl "https://world.openfoodfacts.org/cgi/search.pl?search_terms=chocolate&json=true"

# Get products by category
curl "https://world.openfoodfacts.org/category/chocolates.json"`
        }
    ];

    const features = [
        {
            icon: Globe,
            title: 'Open Food Facts API',
            description: 'FactsScan is powered by the Open Food Facts database, the largest open food products database in the world.',
            link: 'https://world.openfoodfacts.org/data'
        },
        {
            icon: Database,
            title: 'Comprehensive Data',
            description: 'Access nutritional information, ingredients, allergens, and health scores for millions of products.',
            link: 'https://wiki.openfoodfacts.org/API'
        },
        {
            icon: Key,
            title: 'No API Key Required',
            description: 'The Open Food Facts API is completely free and open. No registration or API keys needed.',
            link: 'https://world.openfoodfacts.org/data'
        },
        {
            icon: Zap,
            title: 'Real-Time Updates',
            description: 'Product data is constantly updated by a global community of contributors.',
            link: 'https://world.openfoodfacts.org/contribute'
        }
    ];

    return (
        <div className="page-container">
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                borderRadius: 'var(--radius-3xl)',
                padding: '3rem 2rem',
                marginBottom: '3rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                    marginBottom: '1.5rem',
                    boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)'
                }}>
                    <Book size={40} color="#fff" />
                </div>
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '900',
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    API Documentation
                </h1>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-text-muted)',
                    maxWidth: '700px',
                    margin: '0 auto'
                }}>
                    Learn how to integrate FactsScan's nutritional data into your own applications
                </p>
            </div>

            {/* Introduction */}
            <div style={{
                background: 'var(--gradient-card)',
                borderRadius: 'var(--radius-2xl)',
                padding: '2rem',
                marginBottom: '3rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#fff'
                }}>
                    Getting Started
                </h2>
                <p style={{
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.8',
                    fontSize: '1rem',
                    marginBottom: '1rem'
                }}>
                    FactsScan leverages the powerful <strong style={{ color: '#7c3aed' }}>Open Food Facts API</strong> to provide
                    comprehensive nutritional information. This documentation will help you integrate the same data source into your
                    own applications.
                </p>
                <p style={{
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.8',
                    fontSize: '1rem'
                }}>
                    The API is free, open-source, and requires no authentication. You can start making requests immediately!
                </p>
            </div>

            {/* Features Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                {features.map((feature, index) => (
                    <a
                        key={index}
                        href={feature.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: 'var(--gradient-card)',
                            borderRadius: 'var(--radius-2xl)',
                            padding: '2rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            textDecoration: 'none',
                            transition: 'transform 0.3s, box-shadow 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 58, 237, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: 'var(--radius-lg)',
                            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem'
                        }}>
                            <feature.icon size={24} color="#7c3aed" />
                        </div>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            color: '#fff',
                            marginBottom: '0.5rem'
                        }}>
                            {feature.title}
                        </h3>
                        <p style={{
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.6',
                            fontSize: '0.95rem'
                        }}>
                            {feature.description}
                        </p>
                    </a>
                ))}
            </div>

            {/* API Endpoints */}
            <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                marginBottom: '2rem',
                color: '#fff'
            }}>
                API Endpoints
            </h2>

            {endpoints.map((endpoint, index) => (
                <div
                    key={index}
                    style={{
                        background: 'var(--gradient-card)',
                        borderRadius: 'var(--radius-2xl)',
                        padding: '2rem',
                        marginBottom: '2rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <span style={{
                            padding: '0.5rem 1rem',
                            background: endpoint.method === 'GET' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                            color: endpoint.method === 'GET' ? '#22c55e' : '#3b82f6',
                            borderRadius: 'var(--radius-lg)',
                            fontWeight: '700',
                            fontSize: '0.9rem'
                        }}>
                            {endpoint.method}
                        </span>
                        <code style={{
                            color: '#7c3aed',
                            fontSize: '1.1rem',
                            fontWeight: '600'
                        }}>
                            {endpoint.endpoint}
                        </code>
                    </div>
                    <p style={{
                        color: 'var(--color-text-muted)',
                        marginBottom: '1.5rem',
                        lineHeight: '1.6'
                    }}>
                        {endpoint.description}
                    </p>

                    {/* Request Example */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                        }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#fff'
                            }}>
                                Request Example
                            </h4>
                            <button
                                onClick={() => copyToClipboard(endpoint.example, `example-${index}`)}
                                style={{
                                    background: 'rgba(124, 58, 237, 0.2)',
                                    border: 'none',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: '0.5rem 1rem',
                                    color: '#7c3aed',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.9rem',
                                    transition: 'background 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(124, 58, 237, 0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(124, 58, 237, 0.2)'}
                            >
                                {copiedCode === `example-${index}` ? (
                                    <><Check size={16} /> Copied!</>
                                ) : (
                                    <><Copy size={16} /> Copy</>
                                )}
                            </button>
                        </div>
                        <pre style={{
                            background: 'rgba(0, 0, 0, 0.5)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'auto',
                            fontSize: '0.9rem',
                            lineHeight: '1.6'
                        }}>
                            <code style={{ color: '#a5b4fc' }}>
                                {endpoint.example}
                            </code>
                        </pre>
                    </div>

                    {/* Response Example */}
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                        }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#fff'
                            }}>
                                Response Example
                            </h4>
                            <button
                                onClick={() => copyToClipboard(endpoint.response, `response-${index}`)}
                                style={{
                                    background: 'rgba(124, 58, 237, 0.2)',
                                    border: 'none',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: '0.5rem 1rem',
                                    color: '#7c3aed',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.9rem',
                                    transition: 'background 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(124, 58, 237, 0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(124, 58, 237, 0.2)'}
                            >
                                {copiedCode === `response-${index}` ? (
                                    <><Check size={16} /> Copied!</>
                                ) : (
                                    <><Copy size={16} /> Copy</>
                                )}
                            </button>
                        </div>
                        <pre style={{
                            background: 'rgba(0, 0, 0, 0.5)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'auto',
                            fontSize: '0.9rem',
                            lineHeight: '1.6'
                        }}>
                            <code style={{ color: '#a5b4fc' }}>
                                {endpoint.response}
                            </code>
                        </pre>
                    </div>
                </div>
            ))}

            {/* Integration Examples */}
            <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                marginBottom: '2rem',
                color: '#fff',
                marginTop: '3rem'
            }}>
                Integration Examples
            </h2>

            {integrationGuide.map((guide, index) => (
                <div
                    key={index}
                    style={{
                        background: 'var(--gradient-card)',
                        borderRadius: 'var(--radius-2xl)',
                        padding: '2rem',
                        marginBottom: '2rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 'var(--radius-lg)',
                                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <guide.icon size={20} color="#7c3aed" />
                            </div>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '700',
                                color: '#fff'
                            }}>
                                {guide.title}
                            </h3>
                        </div>
                        <button
                            onClick={() => copyToClipboard(guide.code, `integration-${index}`)}
                            style={{
                                background: 'rgba(124, 58, 237, 0.2)',
                                border: 'none',
                                borderRadius: 'var(--radius-lg)',
                                padding: '0.5rem 1rem',
                                color: '#7c3aed',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                transition: 'background 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(124, 58, 237, 0.3)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(124, 58, 237, 0.2)'}
                        >
                            {copiedCode === `integration-${index}` ? (
                                <><Check size={16} /> Copied!</>
                            ) : (
                                <><Copy size={16} /> Copy</>
                            )}
                        </button>
                    </div>
                    <pre style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'auto',
                        fontSize: '0.9rem',
                        lineHeight: '1.6'
                    }}>
                        <code style={{ color: '#a5b4fc' }}>
                            {guide.code}
                        </code>
                    </pre>
                </div>
            ))}

            {/* Additional Resources */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                borderRadius: 'var(--radius-2xl)',
                padding: '2rem',
                marginBottom: '3rem',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                textAlign: 'center'
            }}>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#fff'
                }}>
                    Additional Resources
                </h3>
                <p style={{
                    color: 'var(--color-text-muted)',
                    marginBottom: '1.5rem',
                    lineHeight: '1.8'
                }}>
                    For more detailed information about the Open Food Facts API, visit the official documentation
                </p>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <a
                        href="https://wiki.openfoodfacts.org/API"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: '600',
                            transition: 'transform 0.3s, box-shadow 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 58, 237, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Official API Docs
                    </a>
                    <a
                        href="https://world.openfoodfacts.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '1rem 2rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: '600',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            transition: 'transform 0.3s, box-shadow 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                    >
                        Open Food Facts
                    </a>
                </div>
            </div>

            {/* Back to Home */}
            <div style={{ textAlign: 'center' }}>
                <Link
                    to="/"
                    style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: '600',
                        transition: 'transform 0.3s, box-shadow 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 58, 237, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ApiDocumentation;
