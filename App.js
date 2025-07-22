import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

// Composant balle qui s'affiche à la position donnée
const Ball = ({ position }) => {
  return (
    <View style={[styles.ball, { top: position.y, left: position.x }]} />
  );
};

// Système qui fait "tomber" la balle en augmentant sa position y
const Physics = (entities, { time }) => {
  let ball = entities.ball;

  // Gravité basique (pixels par frame)
  const gravity = 2;

  // On augmente la position Y de la balle
  ball.position.y += gravity;

  // Optionnel: bloquer la balle en bas de l'écran
  const floorY = 800; // adapte selon la hauteur de ton écran
  if (ball.position.y > floorY) {
    ball.position.y = floorY;
  }

  return entities;
};

export default function App() {
  // Position initiale de la balle (centre horizontal)
  const initialX = 200; // Ajuste selon ton écran
  const initialY = 50;

  const [entities, setEntities] = useState({
    ball: {
      position: { x: initialX, y: initialY },
      renderer: <Ball position={{ x: initialX, y: initialY }} />,
    },
  });

  return (
    <View style={styles.container}>
      <GameEngine
        style={styles.gameContainer}
        systems={[Physics]}
        entities={entities}
        onUpdate={(entities) => setEntities({ ...entities })}
      >
        {/* Titre centré en haut */}
        <Text style={styles.title}>Le flipper de Max</Text>

        {/* Trois cercles en haut en forme de triangle */}
        <View style={styles.circlesContainer}>
          <View style={[styles.circle, styles.topCircle]} />
          <View style={[styles.circle, styles.leftCircle]} />
          <View style={[styles.circle, styles.rightCircle]} />
        </View>
      </GameEngine>

      {/* Zone des boutons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.leftFlipper]}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.rightFlipper]}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#001f3f', // bleu marine
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  gameContainer: {
    flex: 1,
    width: '100%',
  },
  title: {
    position: 'absolute',
    top: 400,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  circlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
  },
  topCircle: {
    top: 0,
  },
  leftCircle: {
    top: 80,
    left: '15%',
  },
  rightCircle: {
    top: 80,
    right: '15%',
  },
  ball: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  leftFlipper: {
    transform: [{ rotate: '20deg' }],
  },
  rightFlipper: {
    transform: [{ rotate: '-20deg' }],
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
