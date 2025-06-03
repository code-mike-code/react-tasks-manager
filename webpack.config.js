const path = require('path');
// importuję bibliotękę [path] z [node.js]
const HtmlWebpackPlugin = require('html-webpack-plugin');
// importuję odpowiedni plugin
module.exports = {
    entry: './src/app.js',
    // definiuje plik wejściowy
    output: {
        path: path.resolve(__dirname, 'build'),
        // definiuje ścieżką wyjściową
        filename: 'app.min.js',
        // definiuję nazwę pliku wyjściowego
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // określam jakie pliki 
                // będą brane pod uwagę
                exclude: /node_modules/,
                // określam wykluczenia
                use: 'babel-loader',
                // określam jaki [loader]
                // ma być wykorzystany
            },
            {
                test: /\.css$/i,
                // wszystkie pliki, których nazwa
                // kończy się na .css
                use: [
                    'style-loader',
                    // dodaj odczytaną zawartość
                    // do znacznika <style/>
                    'css-loader', 
                    // odczytaj plik CSS
                ],
            },
            {
                test: /\.(png|jpg|svg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
        ]
        // obecnie brak dodatkowych ustawień
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // wskazuję plik źródłowy
            filename: 'index.html'
            // określam nazwę dla pliku
        })
    ]
}
// eksportuję ustawienia dla webpack-a
